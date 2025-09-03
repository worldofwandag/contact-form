import React, { useState } from "react";
import radioDeselect from "../assets/images/icon-radio-deselected.png";
import radioSelect from "../assets/images/icon-radio-selected.svg";
import checkboxEmpty from "../assets/images/icon-checkbox-empty.png";
import checkboxChecked from "../assets/images/icon-checkbox-check.svg";
import messageSuccess from "../assets/images/icon-success-check.svg";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { z } from "zod";
import { Toaster, toast } from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1, "This field is required"),
  last_name: z.string().min(1, "This field is required"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(1, "This field is required"),
  query_type: z.string().min(1, "Please select a query type"),
});

const Contactform = () => {
  const customToast = () => (
    <div className="flex flex-col text-white bg-[#2A4144] p-[24px] rounded-[12px] w-[450px] min-h-[107px] mt-[62px]">
      <div className="flex items-center mb-2">
        <Image
          src={messageSuccess}
          alt="success"
          width={24}
          height={24}
          className="flex-shrink-0 mr-2"
        />
        <span className="text-[18px] font-bold">Message sent!</span>
      </div>
      <span className="text-[16px] tracking-tighter">
        Thanks for completing the form, we will be in touch soon!
      </span>
    </div>
  );

  //create object to send to emailjs
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    message: "",
    query_type: "",
  });
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  //for state of submit button and what shows in the button when it's submitting or when it's not
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleQueryTypeSelect = (queryType: string) => {
    setFormData((prev) => ({
      ...prev,
      query_type: queryType,
    }));
    if (errors.query_type) {
      setErrors((prev) => ({ ...prev, query_type: "" }));
    }
  };

  const handleConsentToggle = () => {
    setIsConsentChecked((prev) => !prev);
    if (errors.consent) {
      setErrors((prev) => ({ ...prev, consent: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Initialize errors object
    const newErrors: { [key: string]: string } = {};

    // Validate form data with Zod and check consent simultaneously
    try {
      formSchema.parse({
        ...formData,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((issue) => {
          const path = issue.path[0];
          if (path) {
            newErrors[path.toString()] = issue.message;
          }
        });
      }
    }

    // Check consent
    if (!isConsentChecked) {
      newErrors.consent =
        "To submit this form, please consent to being contacted";
    }

    // If there are any errors, set them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no errors, proceed with form submission
    try {
      setIsSubmitting(true);

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS configuration missing");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          last_name: formData.last_name,
          email: formData.email,
          message: formData.message,
          query_type: formData.query_type,
        },
        publicKey
      );

      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible
                ? "animate-[fadeIn_1000ms_ease]"
                : "animate-[fadeOut_1000ms_ease]"
            }`}
          >
            {customToast()}
          </div>
        ),
        {
          duration: 3000,
          position: "top-center",
          style: {
            marginTop: "240px", 
          },
        }
      );

      // Reset form
      setFormData({
        name: "",
        last_name: "",
        email: "",
        message: "",
        query_type: "",
      });
      setIsConsentChecked(false);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send message. Please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  const errorStyle = "!border-[#D73C3C]";
  const errorTextStyle = "text-[#D73C3C] text-sm mt-2 leading-[150%]";

  return (
    <div className="card__container flex flex-col bg-white min-h-[773px] w-[736px] max-[768px]:w-[690px] max-[690px]:w-[479px] max-[480px]:w-[343px] max-[768px]:min-h-[800px] max-[480px]:min-h-[1074px] rounded-[16px] p-[40px] max-[690px]:p-[24px] ">
      <form className="form__content w-[656px] max-[768px]:w-[610px] max-[690px]:w-[431px] mx-auto">
        <h1 className="card__title text-[32px] font-bold text-[#2A4144] tracking-[-1px] mb-[32px]">
          Contact Us
        </h1>
        <div className="card__fields flex flex-col">
          {/* names */}
          <div className="name__fields flex flex-row max-[480px]:flex-col w-full justify-between max-[480px]:justify-center mb-[24px]">
            <div className="first__name w-[320px] h-[83px] max-[768px]:w-[297px] max-[690px]:w-[calc(100%/2.1)] max-[480px]:w-[295px] max-[480px]:mb-[24px]">
              <div className="first__name--text mb-[8px] text-[16px] leading-[150%]">
                First Name <span className="green--600 ml-[8px]">*</span>
              </div>
              <input
                className={`w-full duration-200  cursor-pointer hover:!border-[#0C7D69] hover:!border-2 ${
                  errors.name ? errorStyle : ""
                }`}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {errors.name && (
                <div className={errorTextStyle}>{errors.name}</div>
              )}
            </div>
            <div className="last__name w-[320px] h-[83px] max-[768px]:w-[297px] max-[690px]:w-[calc(100%/2.1)] max-[480px]:w-[295px]">
              <div className="last__name--text mb-[8px] text-[16px] leading-[150%]">
                Last Name <span className="green--600 ml-[8px]">*</span>
              </div>
              <input
                className={`w-full duration-200 cursor-pointer hover:!border-[#0C7D69] hover:!border-2 ${
                  errors.last_name ? errorStyle : ""
                }`}
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
              />
              {errors.last_name && (
                <div className={errorTextStyle}>{errors.last_name}</div>
              )}
            </div>
          </div>
          {/* email */}
          <div className="email__field mb-[24px] w-full max-[480px]:w-[295px] ">
            <div className="email mb-[8px] text-[16px] leading-[150%]">
              Email Address <span className="green--600 ml-[8px]">*</span>
            </div>
            <input
              className={`w-full duration-200 cursor-pointer hover:!border-[#0C7D69] hover:!border-2 ${
                errors.email ? errorStyle : ""
              }`}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && (
              <div className={errorTextStyle}>{errors.email}</div>
            )}
          </div>
          {/* query type */}
          <div className="query__type h-[91px] max-[480px]:h-[126px] mb-[24px]">
            <div className="query__title mb-[16px] text-[16px] leading-[150%]">
              Query Type <span className="green--600 ml-[8px]">*</span>
            </div>

            <div className="query__boxes flex flex-row w-full justify-between  max-[480px]:flex-col">
              <div
                className={`query__general w-[320px] h-[51px] max-[768px]:w-[297px] max-[690px]:w-[calc(100%/2.1)] max-[480px]:w-[295px] max-[480px]:mb-[16px] query__box flex flex-row items-center cursor-pointer duration-200 hover:!border-[#0C7D69] hover:!border-2
                ${
                  formData.query_type === "General Enquiry"
                    ? "bg-[#E0F1E8] !border-[#0C7D69]"
                    : "bg-white"
                }`}
                onClick={() => handleQueryTypeSelect("General Enquiry")}
              >
                <Image
                  src={
                    formData.query_type === "General Enquiry"
                      ? radioSelect
                      : radioDeselect
                  }
                  alt="radio select"
                  width={24}
                  height={24}
                  className="flex-shrink-0 mr-2"
                />
                <div className="general__text text-[18px] max-[690px]:text-[16px] max-[480px]:text-[18px] leading-[150%]">
                  General Enquiry
                </div>
              </div>
              <div
                className={`query__support w-[320px] h-[51px] max-[768px]:w-[297px] max-[690px]:w-[calc(100%/2.1)] max-[480px]:w-[295px]  query__box flex flex-row items-center cursor-pointer duration-200 hover:!border-[#0C7D69] hover:!border-2
                ${
                  formData.query_type === "Support Request"
                    ? "bg-[#E0F1E8] !border-[#0C7D69]"
                    : "bg-white"
                }`}
                onClick={() => handleQueryTypeSelect("Support Request")}
              >
                <Image
                  src={
                    formData.query_type === "Support Request"
                      ? radioSelect
                      : radioDeselect
                  }
                  alt="radio select"
                  width={24}
                  height={24}
                  className="flex-shrink-0 mr-2"
                />
                <div className="support__text text-[18px] leading-[150%] max-[690px]:text-[16px] max-[480px]:text-[18px]">
                  Support Request
                </div>
              </div>
            </div>
            {errors.query_type && (
              <div className={errorTextStyle}>{errors.query_type}</div>
            )}
          </div>
          {/* Message */}
          <div className="message__field h-[137px] w-full max-[480px]:w-[295px] max-[480px]:h-[272px] max-[480px]:mt-[40px]">
            <div className="message--text mb-[8px] text-[16px] leading-[150%]">
              Message <span className="green--600 ml-[8px]">*</span>{" "}
            </div>
            <textarea
              className={`message__box resize-none duration-200 cursor-pointer hover:!border-[#0C7D69] hover:!border-2 w-full h-[105px] max-[768px]:h-[132px] max-[480px]:h-[240px] text-[18px] ${
                errors.message ? errorStyle : ""
              }`}
              rows={3}
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
            />
            {errors.message && (
              <div className={`${errorTextStyle} mb-[40px] max-[480px]:mb-[8px]`}>
                {errors.message}
              </div>
            )}
          </div>
        </div>
      </form>
      {/* consent */}
      <div
        className={`consent__container mb-[40px] ${
          errors.message ? "mt-[40px]" : ""
        }`}
      >
        <div className="consent__box--text flex flex-row gap-2 mt-[40px] max-[768px]:mt-[78px] max-[480px]:mt-[40px] cursor-pointer items-center">
          <Image
            src={isConsentChecked ? checkboxChecked : checkboxEmpty}
            alt={isConsentChecked ? "checkboxChecked" : "checkboxEmpty"}
            width={24}
            height={24}
            className="flex-shrink-0 mr-2 cursor-pointer"
            onClick={handleConsentToggle}
          />
          <div
            className="consent__text text-[16px] leading-[150%]"
            onClick={handleConsentToggle}
          >
            I consent to being contacted by the team{" "}
            <span className="green--600 ml-[8px] ">*</span>
          </div>
        </div>

        {errors.consent && (
          <div className={`${errorTextStyle}`}>{errors.consent}</div>
        )}
      </div>
      {/* submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        onClick={handleSubmit}
        className="submit__button w-full h-[59px] rounded-[8px] bg-[#0C7D69] hover:bg-[#2A4144]  text-white text-[18px] font-bold leading-[150%] cursor-pointer duration-300"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center animate-[pulse_1s_ease-in-out_infinite]">
            Sending
            <span className="inline-block animate-[pulse_1s_ease-in-out_infinite] ml-[2px]">
              .
            </span>
            <span className="inline-block animate-[pulse_1s_ease-in-out_infinite_200ms] ml-[2px]">
              .
            </span>
            <span className="inline-block animate-[pulse_1s_ease-in-out_infinite_400ms] ml-[2px]">
              .
            </span>
          </span>
        ) : (
          "Submit"
        )}
      </button>
      <Toaster />
    </div>
  );
};

export default Contactform;

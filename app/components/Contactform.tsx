import React, { useState } from "react";
import radioDeselect from "../assets/images/icon-radio-deselected.png";
import radioSelect from "../assets/images/icon-radio-selected.svg"
import checkboxEmpty from "../assets/images/icon-checkbox-empty.png";
import checkboxChecked from "../assets/images/icon-checkbox-check.svg"
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { z } from "zod";

const Contactform = () => {
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQueryTypeSelect = (queryType: string) => {
    setFormData((prev) => ({
      ...prev,
      query_type: queryType,
    }));
  };

  const handleConsentToggle = () => {
    setIsConsentChecked((prev) => !prev);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault;
    setIsSubmitting(true);
    try {
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

      alert("Message Sent! Thanks for completing the form, we will be in touch soon");
      // Reset form
      setFormData({
        name: "",
        last_name: "",
        email: "",
        message: "",
        query_type: "",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send message. Please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card__container flex flex-col bg-white min-h-[773px] w-[736px] rounded-[16px] p-[40px] ">
      <form className="form__content w-[656px] mx-auto mb-[40px]">
        <h1 className="card__title text-[32px] font-bold text-[#2A4144] tracking-[-1px] mb-[32px]">
          Contact Us
        </h1>
        <div className="card__fields flex flex-col ">
          {/* names */}
          <div className="name__fields flex flex-row w-full justify-between mb-[24px]">
            <div className="first__name w-[320px] h-[83px]">
              <div className="first__name--text mb-[8px]">
                First Name <span className="green--600 ml-[8px]">*</span>
              </div>
              <input
                className="w-full"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="last__name w-[320px] h-[83px]">
              <div className="last__name--text mb-[8px]">
                Last Name <span className="green--600 ml-[8px]">*</span>
              </div>
              <input
                className="w-full"
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          {/* email */}
          <div className="email__field mb-[24px] w-full">
            <div className="email mb-[8px]">
              Email Address <span className="green--600 ml-[8px]">*</span>
            </div>
            <input
                className="w-full"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
          </div>
          {/* query type */}
          <div className="query__type w-full h-[91px] mb-[24px]">
            <div className="query__title mb-[16px]">
              Query Type <span className="green--600 ml-[8px]">*</span>
            </div>

            <div className="query__boxes flex flex-row w-full justify-between">
              <div className={`query__general w-[320px] h-[51px] query__box flex flex-row items-center cursor-pointer
                ${
                  formData.query_type === 'General Enquiry'
                  ? "bg-[#E0F1E8] border-[#0C7D69]"
                  : "bg-white"
                }`}
                onClick={() => handleQueryTypeSelect('General Enquiry')}
                >
                <Image
                  src={formData.query_type === 'General Enquiry' ? radioSelect : radioDeselect}
                  alt="radio select"
                  width={24}
                  height={24}
                  className="flex-shrink-0 mr-2"
                />
                <div className="general__text text-[18px] leading-[150%]">
                  General Enquiry
                </div>
              </div>
              <div className={`query__support w-[320px] h-[51px] query__box flex flex-row items-center cursor-pointer
                ${
                  formData.query_type === 'Support Request'
                  ? "bg-[#E0F1E8] border-[#0C7D69]"
                  : "bg-white"
                }`}
                onClick={() => handleQueryTypeSelect('Support Request')}
                >
                <Image
                  src={formData.query_type === 'Support Request' ? radioSelect : radioDeselect}
                  alt="radio select"
                  width={24}
                  height={24}
                  className="flex-shrink-0 mr-2"
                />
                <div className="support__text text-[18px] leading-[150%]">
                  Support Request
                </div>
              </div>
            </div>
          </div>
          {/* Message */}
          <div className="message__field h-[137px] w-full">
            <div className="message--text mb-[8px]">
              Message <span className="green--600 ml-[8px]">*</span>{" "}
            </div>
            <textarea
              className="message__box w-full  h-[105px] text-[18px]"
              rows={3}
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </form>
      {/* consent */}
      <div className="consent__container flex flex-row gap-2 mb-[40px]">
        <Image
          src={isConsentChecked ? checkboxChecked : checkboxEmpty}
          alt={isConsentChecked ? 'checkboxChecked' : 'checkboxEmpty'}
          width={24}
          height={24}
          className="flex-shrink-0 mr-2 cursor-pointer"
          onClick={handleConsentToggle}
        />
        <div className="consent__text ">
          I consent to being contacted by the team{" "}
          <span className="green--600 ml-[8px]">*</span>
        </div>
      </div>
      {/* submit */}
      <button 
      type="submit"
      disabled={isSubmitting}
      onClick={handleSubmit}
      className="submit__button w-full h-[59px] rounded-[8px] bg-[#2A4144] text-white text-[18px] font-bold leading-[150%] cursor-pointer">
        {isSubmitting ? 'Sending...' : 'Submit'}
      </button>
    </div>
  );
};

export default Contactform;

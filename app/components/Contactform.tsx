import React from "react";
import radioDeselect from "../assets/images/icon-radio-deselected.png";
import checkboxEmpty from "../assets/images/icon-checkbox-empty.png";
import Image from "next/image";

const Contactform = () => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  return (
    <div className="card__container flex flex-col bg-white min-h-[773px] w-[736px] rounded-[16px] p-[40px] ">
      <div className="form__content w-[656px] mx-auto mb-[40px]">
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
              <input className="w-full " type="text" />
            </div>
            <div className="last__name w-[320px] h-[83px]">
              <div className="last__name--text mb-[8px]">
                Last Name <span className="green--600 ml-[8px]">*</span>
              </div>
              <input className="w-full " type="text" />
            </div>
          </div>
          {/* email */}
          <div className="email__field mb-[24px] w-full">
            <div className="email mb-[8px]">
              Email Address <span className="green--600 ml-[8px]">*</span>
            </div>
            <input className="w-full" type="email" />
          </div>
          {/* query type */}
          <div className="query__type w-full h-[91px] mb-[24px]">
            <div className="query__title mb-[16px]">
              Query Type <span className="green--600 ml-[8px]">*</span>
            </div>

            <div className="query__boxes flex flex-row w-full justify-between">
              <div className="query__general w-[320px] h-[51px] query__box flex flex-row items-center cursor-pointer">
                <Image
                  src={radioDeselect}
                  alt="radio deselect"
                  width={24}
                  height={24}
                  className="flex-shrink-0 mr-2"
                />
                <div className="general__text text-[18px] leading-[150%]">
                  General Enquiry
                </div>
              </div>
              <div className="query__support w-[320px] h-[51px] query__box flex flex-row items-center cursor-pointer">
                <Image
                  src={radioDeselect}
                  alt="radio deselect"
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
            />
          </div>
        </div>
      </div>
      {/* consent */}
      <div className="consent__container flex flex-row gap-2 mb-[40px]">
        <Image
          src={checkboxEmpty}
          alt="checkbox empty"
          width={24}
          height={24}
          className="flex-shrink-0 mr-2"
        />
        <div className="consent__text">
          I consent to being contacted by the team{" "}
          <span className="green--600 ml-[8px]">*</span>
        </div>
      </div>
      {/* submit */}
      <button className="submit__button w-full h-[59px] rounded-[8px] bg-[#2A4144] text-white text-[18px] font-bold leading-[150%] cursor-pointer">
        Submit
      </button>
    </div>
  );
};

export default Contactform;

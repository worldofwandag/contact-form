import React from "react";

const Contactform = () => {
  return (
    <div className="card__container flex flex-col bg-white min-h-[736px] w-[736px] rounded-[16px] p-[40px] ">
      <div className="form__content w-[656px] mx-auto">
        <h1 className="card__title text-[32px] font-bold text-[#2A4144] tracking-[-1px] mb-[32px]">Contact Us</h1>
        <div className="card__fields flex flex-col ">
          {/* names */}
          <div className="name__fields flex flex-row w-full justify-between">
            <div className="first__name w-[320px] h-[83px]">
              <div className="first__name--text mb-[8px]">First Name *</div>
              <input className="w-full " type="text" />
            </div>
            <div className="last__name w-[320px] h-[83px]">
              <div className="last__name--text mb-[8px]">Last Name *</div>
              <input className="w-full " type="text" />
            </div>
          </div>
          {/* email */}
          <div className="email__field">
            <div className="email">Email Adress *</div>
            <input type="email" />
          </div>
          {/* query type */}
          <div className="query__type">
            <div className="query__title">Query Type *</div>
            <div className="query__boxes">
              <div className="query__general">
                <div className="radio__status"></div>
                <div className="general__text">General Enquiry</div>
              </div>
              <div className="query__support">
                <div className="radio__status"></div>
                <div className="support__text">Support Request</div>
              </div>
            </div>
          </div>
          {/* Message */}
          <div className="message__field">
            <div className="message--text">Message * </div>
            <input className="message__box" type="text" />
          </div>
        </div>
      </div>
      {/* consent */}
      <div className="consent__container">
        <div className="checkbox__empty"></div>
        <div className="consent__text">
          I consent to being contacted by the team *
        </div>
      </div>
      {/* submit */}
      <button className="submit__button w-[50px] h-[15px] rounded-[5%]">
        Submit
      </button>
    </div>
  );
};

export default Contactform;

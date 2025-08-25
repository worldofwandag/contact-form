import React from 'react';


const Contactform = () => {
    return (
        <div className='card__container flex bg-white min-h-[736px] min-w-[773px] rounded-[3%]'>
            <div className='form__content'>
                <div className='card__title'>
                    Contact Us
                </div>
                <div className='card__fields'>
                    {/* names */}
                    <div className='name__fields'>
                        <div className='first__name'>
                            <div className='first__name--text'>First Name *</div>
                            <input type="text" />
                        </div>
                        <div className='last__name'>
                            <div className='last__name--text'>Last Name *</div>
                            <input type="text" />
                        </div>
                    </div>
                    {/* email */}
                    <div className='email__field'>
                        <div className='email'>Email Adress *</div>
                        <input type="email" />
                    </div>
                </div>


            </div>
        </div>
    );
}


export default Contactform;
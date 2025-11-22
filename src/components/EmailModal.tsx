import { useState, useEffect } from 'react';
import svgPaths from "../imports/svg-9gqd1xhwdw";
import imgImage from "../assets/4f1ed71a8e5456f8b8cf9bc696ca9afe262f2ec0.png";
import imgImageMobile from "../assets/944300956d68a2c588e5fa327cca344e00b046d7.png";
import { motion } from "motion/react";
import { subscribeToNewsletter } from '../lib/api';
import { toast } from 'sonner';
import styles from './EmailModal.module.css';

function BackgroundOverlay() {
  return <div className={styles.backgroundOverlay} data-name="Background overlay" />;
}

function BackgroundOverlay1() {
  return (
    <div className={styles.backgroundOverlay1} data-name="Background overlay">
      <BackgroundOverlay />
    </div>
  );
}

function XClose() {
  return (
    <div className={styles.xClose} data-name="x-close">
      <svg className={styles.xCloseIcon} fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="x-close">
          <path d="M18 6L6 18M6 6L18 18" id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function XCloseMobile({ onClick }: { onClick?: () => void }) {
  return (
    <div className={styles.xCloseMobile} data-name="x-close">
      <svg className={styles.xCloseIcon} fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="x-close">
          <path d="M18 6L6 18M6 6L18 18" id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonCloseX({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={styles.buttonCloseX}
      data-name="Button close X"
    >
      <XClose />
    </button>
  );
}

function ButtonCloseXMobile({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={styles.buttonCloseXMobile}
      data-name="Button close X"
    >
      <XCloseMobile />
    </button>
  );
}

function ButtonsButtonLoadingIcon() {
  return (
    <motion.div
      className={styles.buttonLoadingIcon}
      data-name="Buttons/Button loading icon"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <svg className={styles.buttonLoadingIconSvg} fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Buttons/Button loading icon">
          <path d={svgPaths.p39161900} id="Background" opacity="0.3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p4660fb4} id="Line" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </motion.div>
  );
}

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (page: 'privacyPolicy') => void;
}

export function EmailModal({ isOpen, onClose, onNavigate }: EmailModalProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !isLoading) {
      setIsLoading(true);
      
      try {
        // Subscribe using Supabase
        await subscribeToNewsletter(email);
        
        // Store that user has subscribed (so modal doesn't show again)
        localStorage.setItem('hasSubscribed', 'true');
        
        // Close modal and reset form
        setEmail('');
        onClose();
        
        // Show success toast
        toast.success('You have been subscribed successfully!');
      } catch (error) {
        console.error('Subscription failed:', error);
        alert('Subscription failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.modal}
      data-name="Modal"
    >
      <div className={styles.modalContainer}>
        <div className={styles.modalInner}>
          <BackgroundOverlay1 />
          
          {/* Desktop Layout */}
          <div className={styles.desktopContainer} data-name="Container">
            <div className={styles.desktopContainerInner}>
              <div className={styles.desktopContentWrapper}>
                <div className={styles.desktopContent} data-name="Content">
                  {/* Image Section */}
                  <div className={styles.desktopImageSection} data-name="Image">
                    <img alt="" className={styles.desktopImage} src={imgImage} />
                  </div>

                  {/* Content Section */}
                  <div className={styles.desktopContentSection} data-name="Content">
                    <ButtonCloseX onClick={onClose} />
                    <div className={styles.desktopContentInner}>
                      <div className={styles.desktopFormContainer}>
                        {/* Heading */}
                        <div className={styles.desktopHeadingContainer} data-name="Heading and supporting text">
                          <p className={styles.desktopHeading}>Stay in the know</p>
                          <p className={styles.desktopDescription}>No spam. Just the latest releases and tips, interesting articles, and exclusive interviews.</p>
                        </div>
                        
                        {/* Email Form */}
                        <form onSubmit={handleSubmit} className={styles.desktopForm} data-name="Email capture">
                          <div className={styles.desktopInputField} data-name="Input field">
                            <div className={styles.desktopInputWrapper} data-name="Input with label">
                              <div className={styles.desktopInput} data-name="Input">
                                <div aria-hidden="true" className={styles.desktopInputBorder} />
                                <div className={styles.desktopInputInner}>
                                  <div className={styles.desktopInputContent}>
                                    <input
                                      type="email"
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      placeholder="Enter your email"
                                      disabled={isLoading}
                                      className={styles.desktopInputFieldInput}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p className={styles.desktopPrivacyText}>
                              <span>{`We care about your data in our `}</span>
                              <span 
                                className={styles.desktopPrivacyLink}
                                onClick={() => {
                                  onClose();
                                  onNavigate?.('privacyPolicy');
                                }}
                              >
                                privacy policy
                              </span>.
                            </p>
                          </div>
                          
                          <button
                            type="submit"
                            disabled={!email || isLoading}
                            className={`${styles.desktopSubmitButton} ${(email || isLoading) ? styles.desktopSubmitButtonActive : styles.desktopSubmitButtonDisabled}`}
                            data-name="Buttons/Button"
                          >
                            <div className={styles.desktopSubmitButtonInner}>
                              {isLoading && <ButtonsButtonLoadingIcon />}
                              <div className={styles.desktopSubmitButtonText} data-name="Text padding">
                                <p className={(email || isLoading) ? styles.desktopSubmitButtonTextActive : styles.desktopSubmitButtonTextDisabled}>Subscribe</p>
                              </div>
                            </div>
                            {(email || isLoading) ? (
                              <div aria-hidden="true" className={styles.desktopSubmitButtonBorderActive} />
                            ) : (
                              <div aria-hidden="true" className={styles.desktopSubmitButtonBorderDisabled} />
                            )}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className={styles.mobileContainer} data-name="Mobile Container">
            <div className={styles.mobileContent} data-name="Content">
              {/* Image Section */}
              <div className={styles.mobileImageSection} data-name="Image Section">
                <img alt="" className={styles.mobileImage} src={imgImageMobile} />
                <ButtonCloseXMobile onClick={onClose} />
              </div>

              {/* Text and Form */}
              <div className={styles.mobileTextSection} data-name="Text and actions">
                <div className={styles.mobileTextInner}>
                  <div className={styles.mobileFormContainer}>
                    {/* Heading */}
                    <div className={styles.mobileHeadingContainer} data-name="Heading and supporting text">
                      <p className={styles.mobileHeading}>Stay in the know</p>
                      <p className={styles.mobileDescription}>No spam. Just the latest releases and tips, interesting articles, and exclusive interviews.</p>
                    </div>
                    
                    {/* Email Form */}
                    <form onSubmit={handleSubmit} className={styles.mobileForm} data-name="Email capture">
                      <div className={styles.mobileInputField} data-name="Input field">
                        <div className={styles.mobileInputWrapper} data-name="Input with label">
                          <div className={styles.mobileInput} data-name="Input">
                            <div aria-hidden="true" className={styles.mobileInputBorder} />
                            <div className={styles.mobileInputInner}>
                              <div className={styles.mobileInputContent}>
                                <input
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  placeholder="Enter your email"
                                  disabled={isLoading}
                                  className={styles.mobileInputFieldInput}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className={styles.mobilePrivacyText}>
                          <span>{`Read about our `}</span>
                          <span 
                            className={styles.mobilePrivacyLink}
                            onClick={() => {
                              onClose();
                              onNavigate?.('privacyPolicy');
                            }}
                          >
                            privacy policy
                          </span>.
                        </p>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={!email || isLoading}
                        className={`${styles.mobileSubmitButton} ${(email || isLoading) ? styles.mobileSubmitButtonActive : styles.mobileSubmitButtonDisabled}`}
                        data-name="Buttons/Button"
                      >
                        <div className={styles.mobileSubmitButtonInner}>
                          <div className={styles.mobileSubmitButtonContent}>
                            {isLoading && <ButtonsButtonLoadingIcon />}
                            <div className={styles.mobileSubmitButtonText} data-name="Text padding">
                              <p className={(email || isLoading) ? styles.mobileSubmitButtonTextActive : styles.mobileSubmitButtonTextDisabled}>Subscribe</p>
                            </div>
                          </div>
                        </div>
                        {(email || isLoading) ? (
                          <div aria-hidden="true" className={styles.mobileSubmitButtonBorderActive} />
                        ) : (
                          <div aria-hidden="true" className={styles.mobileSubmitButtonBorderDisabled} />
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
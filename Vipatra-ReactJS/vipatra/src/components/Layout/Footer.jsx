// src/components/layout/Footer.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer className="bg-primary text-textOnPrimary text-center p-4 text-xs font-sans shadow-soft mt-auto">
            © {new Date().getFullYear()} {t('appTitle', 'Vipatra')}. {t('footer.allRightsReserved', 'All Rights Reserved')}.
            <span className="mx-1">|</span>
            <a href="#" className="hover:text-accent">{t('footer.privacyPolicy', 'Privacy Policy')}</a>
            <span className="mx-1">|</span>
            <a href="#" className="hover:text-accent">{t('footer.termsOfService', 'Terms of Service')}</a>
        </footer>
    );
};

export default Footer;
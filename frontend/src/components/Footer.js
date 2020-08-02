import React from 'react';
import {useSelector} from 'react-redux';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { authorName, authorLink } = useSelector((state) => state.appDetails.author);

    return (
    <footer className="footer">Developed by &nbsp;<a href={authorLink} style={{color: "deepskyblue"}}>{authorName}</a>.&nbsp;&copy; {currentYear} All right reserved.</footer>
    );
}

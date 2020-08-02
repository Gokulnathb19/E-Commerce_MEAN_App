import React from 'react';
import {useSelector} from 'react-redux';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { authorName, authorLink } = useSelector((state) => state.appDetails.author);

    return (
    <footer className="footer"><div>Developed by &nbsp;<a href={authorLink} style={{color: "deepskyblue"}}>{authorName}</a>.</div><div>&copy; {currentYear} All right reserved.</div></footer>
    );
}

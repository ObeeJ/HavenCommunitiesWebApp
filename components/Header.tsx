import React from 'react';

const Header = () => {
    return (
        <header>
            {/* ...existing header/navigation content... */}
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/blog">Blog</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/project">Project</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;

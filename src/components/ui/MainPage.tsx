import React from 'react';

interface MainPageProps {
    children: React.ReactNode;
}

function MainPage({ children }: MainPageProps) {
    return (
        <main className="p-4 md:ml-64 h-auto pt-20">
            {children}
        </main>
    );
}

export default MainPage;
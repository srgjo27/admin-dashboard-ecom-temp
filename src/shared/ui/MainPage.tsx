import React from 'react';
import Breadcrumb from './Breadcrumb';
import { Toaster } from 'react-hot-toast';

interface MainPageProps {
    children: React.ReactNode;
}

function MainPage({ children }: MainPageProps) {
    return (
        <main className="p-4 md:ml-64 h-auto pt-20">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Breadcrumb />
            {children}
        </main>
    );
}

export default MainPage;
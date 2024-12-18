// Layout.js
import React from 'react';
import Header from './Header'; // تأكد من أن المسار صحيح

export default function Layout({ children }) {
  return (
    <div className="w-screen h-screen bg-fares2 gap-60">
      <Header />
      <main className="p-5">
        {children} {/* عرض العناصر التي سيتم تمريرها للمكون */}
      </main>
    </div>
  );
}

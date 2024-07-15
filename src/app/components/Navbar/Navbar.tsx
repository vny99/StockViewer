import React from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../styles/globals.css';
import { STOCKS } from '@/app/data/mockData';

const NavbarComponent: React.FC<React.PropsWithChildren<{}>> = ({ children }: React.PropsWithChildren<{}>) => {
  return (
      <div className="">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{
        borderBottom: "1px solid #F2E59A",
        backgroundColor: "linear-gradient(145deg, #f0c27b, #4b1248)",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
      }}>
        <div className="d-flex justify-content-between w-100">
          <Link href="/" style={{
            marginLeft: "2rem",
            marginTop: "0.4rem",
            fontSize: "1.7rem",
            textDecoration: "none",
            color: "#F2E59A" ,
            fontFamily: "serif"
          }}><h2 style={{ color: "#F2E59A" }}>My Stocks</h2></Link>
          <ul className="navbar-nav" style={{ marginRight: "4rem", marginTop: "0.4rem" }}>
            <li className="nav-item" style={{ marginRight: "1rem" }}>
              <Link href="/" className="nav-link" style={{ color: "#FFF5EE" }}>HOME</Link>
            </li>
            {STOCKS.map((stock: string) => (
              <li className="nav-item" key={stock} style={{ marginRight: "1rem" }}>
                <Link href={`/pages/stockList/${encodeURIComponent(stock)}`} className="nav-link" style={{ color: "#FFF5EE" }}>{stock}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
        {children}
      </div>
  );
};

export default NavbarComponent;
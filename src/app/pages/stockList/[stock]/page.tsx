"use client";
import StockList from "@/app/components/StockList/StockList";
import { useParams } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css'
import { StoreProvider } from "@/app/components/StoreProvider";
import NavbarComponent from "@/app/components/Navbar/Navbar";

const StockPage = () => {
    const { stock } = useParams() as { stock: string };
    return <StoreProvider><NavbarComponent><StockList symbol={stock}></StockList></NavbarComponent></StoreProvider>
}


export default StockPage;
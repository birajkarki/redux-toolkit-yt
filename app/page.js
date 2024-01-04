import CompanyForm from "@/components/CompanyForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>hi</h1>{" "}
      <Link href="/company">Click here to go to : company form</Link>
    </>
  );
}

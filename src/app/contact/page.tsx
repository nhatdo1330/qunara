import type { Metadata } from "next"; import { ContactForm } from "./contact-form";
export const metadata:Metadata={title:"Contact"};
export default function Contact(){return <section className="shell grid min-h-[760px] gap-16 pb-24 pt-40 lg:grid-cols-2"><div><p className="kicker">Contact</p><h1 className="page-title mt-6">Join the conversation.</h1><p className="mt-8 max-w-md text-sm leading-7 text-mist">Suggest a source, question an interpretation, or tell us what you would like to understand next.</p></div><ContactForm/></section>}

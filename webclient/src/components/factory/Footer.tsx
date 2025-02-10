
/**
 * Footer component that renders a footer section with copyright information.
 * It styles the footer to be centered with a specific height.
 */

const Footer = () => {
    return(
           <FooterContentComponent />
    );
}
export default Footer;

/**
 * FooterContentComponent renders a footer section with a logo, copyright
 * information, and navigation links categorized into sections like Product,
 * Features, Resources, and Company. Each section contains multiple links
 * and is styled using inline-flex layout with specified dimensions and
 * spacing.
 */

const FooterContentComponent = () => (
    <div className="fixed bottom-0 w-full flex-col justify-start items-center gap-5 inline-flex border-t bg-white">
        <div className="float-end justify-center items-center gap-5 inline-flex bg-white">
            <div className="h-[280px] p-10 justify-end items-end gap-[50px] inline-flex overflow-hidden">
            <div className="w-[120px] self-stretch p-2.5 flex-col justify-start items-start gap-2.5 inline-flex overflow-hidden">
            <div className="self-stretch h-5 flex-col justify-center items-start gap-2.5 flex overflow-hidden">
                <div className="text-black text-sm font-bold font-['Roboto'] leading-tight">Product</div>
            </div>
            <div className="self-stretch h-[100px] flex-col justify-center items-start gap-2.5 flex overflow-hidden">
                <div className="self-stretch text-black text-sm font-normal font-['Roboto'] leading-tight">Product</div>
                <div className="self-stretch text-black text-sm font-normal font-['Roboto'] leading-tight">Product</div>
                <div className="self-stretch text-black text-sm font-normal font-['Roboto'] leading-tight">Product</div>
            </div>
            </div>
            <div className="w-[120px] self-stretch p-2.5 flex-col justify-start items-start gap-2.5 inline-flex overflow-hidden">
            <div className="self-stretch h-5 flex-col justify-center items-start gap-2.5 flex overflow-hidden">
                <div className="text-black text-sm font-bold font-['Roboto'] leading-tight">Features</div>
            </div>
            <div className="self-stretch h-[100px] flex-col justify-center items-start gap-2.5 flex overflow-hidden" >
                <div className="self-stretch text-black text-sm font-normal font-['Roboto'] leading-tight">Feature</div>
                <div className="self-stretch text-black text-sm font-normal font-['Roboto'] leading-tight">Feature</div>
                <div className="self-stretch text-black text-sm font-normal font-['Roboto'] leading-tight">Feature</div>
            </div>
            </div>
            <div className="w-[120px] self-stretch p-2.5 flex-col justify-start items-start gap-2.5 inline-flex overflow-hidden">
            <div className="self-stretch h-5 flex-col justify-center items-start gap-2.5 flex overflow-hidden">
                <div className="text-black text-sm font-bold font-['Roboto'] leading-tight">Resourses</div>
            </div>
            <div className="self-stretch h-[100px] flex-col justify-center items-start gap-2.5 flex overflow-hidden">
                <div className="self-stretch text-black text-sm font-normal font-['Roboto'] leading-tight">Resource</div>
                <div className="self-stretch text-black text-sm font-normal font-['Roboto'] leading-tight">Resource</div>
                <div className="self-stretch text-black text-sm font-normal font-['Roboto'] leading-tight">Resource</div>
            </div>
            </div>
            <div className="w-[120px] self-stretch p-2.5 flex-col justify-start items-start gap-2.5 inline-flex overflow-hidden">
            <div className="self-stretch h-5 flex-col justify-center items-start gap-2.5 flex overflow-hidden">
                <div className="text-black text-sm font-bold font-['Roboto'] leading-tight">Company</div>
            </div>
            <div className="self-stretch h-[100px] flex-col justify-center items-start gap-2.5 flex overflow-hidden">
                <div className="self-stretch text-black text-sm font-normal font-['Roboto'] leading-tight">Company</div>
                <div className="self-stretch text-black text-sm font-normal font-['Roboto'] leading-tight">Company</div>
                <div className="self-stretch text-black text-sm font-normal font-['Roboto'] leading-tight">Company</div>
            </div>
            </div>
        </div>
        </div>
    </div>
);


import AddNewOrganisation from "../Organisation/AddOrganisation";
import ModalComponent from "@/components/factory/GenericComponent/Modal";

 const Organisation: React.FC = () => {
    return(
        <div className="w-full h-full flex items-center justify-center">
            <ModalComponent children={<AddNewOrganisation/>} Title={"addOrganisation"} Description={"allow u to add an organisation"} />
              
        </div>);
}

export default Organisation;
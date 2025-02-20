import React,{FC}from 'react';
import { GetAdressDto } from '../../../interfaces/Adress/getAdressDto';


interface AddressDetailProps 
{
    props?: GetAdressDto;
}
const AddressDetail: FC<AddressDetailProps> = ({ props: address }) => {
  if (!address) {
    return <p>Not defined</p>;
  }

  return (
    <div className="flex flex-col mt-4 p-4 text-center">
      <div className="mb-2 my-4 space-y-2">
        <p>
          <strong>Street :</strong> {address.street}
        </p>
        <p>
          <strong>Postal Code :</strong> {address.postalCode}
        </p>
        <p>
          <strong>City :</strong> {address.city}
        </p>
        <p>
          <strong>Country :</strong> {address.country}
        </p>
      </div>
    </div>
  );
};

export default AddressDetail;
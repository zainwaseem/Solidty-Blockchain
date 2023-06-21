



import Checkout from './UpdateRequestForm/CheckOut';

export default function UpdatePage({address,registerStudentContract,requestUpdateContract}) {
  

  return (
    <>
    <Checkout address={address} registerStudentContract={registerStudentContract} requestUpdateContract={requestUpdateContract}/>
 
       </>        
          
  );
}

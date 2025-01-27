import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }:{
      isError: any;
       error:any;
       fallback:any;
    }) => {
      if (isError) {
        if (fallback) fallback();
        else toast.error(error.data.message || "something want worng ");
      }
    });
  }, [errors]);
};



const useAsyncMutation = (mutationHook:any) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState("");
  const [data, setData] = useState([]);
  const [mutate] = mutationHook();

  const executeMutation = async (taostMessage:string, ...args:any) => {
    console.log(taostMessage,"toastmesssage useAync mu");
    
    const toastId = toast.loading("upadating data...");
    setIsLoading(true);
    try {
      const response = await mutate(...args);

 
      if (response?.data.statusCode >= 200 && response?.data.statusCode <= 300) {
        setIsLoading(false);
        toast.success(response?.data.message ||"data updated successfully", { id: toastId });
        setData(response.data.data);
        console.log("enter true ");
      }
      else{
        toast.error("Somthing went wrong successfully", { id: toastId });
      }
    } catch (error: any) {
      console.log("error", error);
      console.log("false ");
      
      console.log(error?.data?.message, "error from server");

      toast.error("Somthing went wrong ", { id: toastId });
      setIsLoading(false);
      if (error.response) {
        // Server responded with a status other than 200 range
        console.log(
          `Error response from server: ${error.response.status} - ${error.response.data}`
        );
        setIsError(`Error: ${error.response.data.message || "Server Error"}`);
      } else if (error.request) {
        // No response received from server
        console.log("No response received from server", error.request);
        setIsError("No response received from server. Please try again later.");
      }
    } finally {

      setIsLoading(false);
    }
  };

  return [executeMutation, isLoading, data, isError];
};


const useSocketEvents  = (socket:any,handler:any)=>{
 

  useEffect(()=>{

    Object.entries(handler).forEach(([event,handler]) =>{
      socket.on(event,handler)
    })

    return ()=>{
      Object.entries(handler).forEach(([event,handler]) =>{
        socket.off(event,handler)
      })
    }

  },[socket,handler])

}

export { useErrors, useAsyncMutation ,useSocketEvents};

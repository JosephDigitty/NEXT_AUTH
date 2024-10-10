import { CardWrapper } from "@/components/auth/CardWrapper";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
    return ( 
        <CardWrapper
        headerLabel="Oops! some error occurred"
        backButtonLabel="Back to Homepage"
        backButtonHref="/auth/login"
        >
            <div className="w-full flex justify-center items-center ">
                <FaExclamationTriangle className="text-destructive"></FaExclamationTriangle>
            </div>

        </CardWrapper>
     )
}
 
export default ErrorPage;
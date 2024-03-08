import Image from "next/image";
import loading from "../../../public/assets/loading.gif";

interface IsLoading {
  isLoadingQuestion: boolean;
  children: any;
}

export function LoadingPage({ isLoadingQuestion, children }: IsLoading) {

  return isLoadingQuestion ?  (
      <section className="h-full">
            <div className="absolute h-full w-full flex  flex-col z-50 justify-center items-center bg-black bg-opacity-75">
              <Image src={loading} alt="loading" />
              <p className="text-2xl text-white">Loading...</p>
            </div>
            {children}
        </section>
    ) :  children;

}

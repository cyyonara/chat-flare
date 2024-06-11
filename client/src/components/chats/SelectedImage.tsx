import { ISelectedImage } from "@/types";
import { X } from "lucide-react";

interface IProps extends ISelectedImage {
   removeImage: () => void;
}

export default function SelectedImage({
   imageId,
   imageFile,
   removeImage,
}: IProps) {
   return (
      <div className="relative">
         <button
            className="disabled:text- absolute -right-[4px] -top-[4px] z-[20] rounded-full bg-secondary p-[3px] hover:bg-secondary/80 disabled:cursor-not-allowed disabled:bg-foreground disabled:text-black"
            onClick={removeImage}
         >
            <X size={12} />
         </button>
         <img
            src={URL.createObjectURL(imageFile)}
            alt={imageId}
            className="h-[40px] w-[40px] rounded-sm object-cover object-center"
         />
      </div>
   );
}

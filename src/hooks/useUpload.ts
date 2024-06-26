"use client";

import { useEffect, useState, useContext } from "react";
import { uploadFile } from "@uploadcare/upload-client";
import { toast } from "sonner";
import { Context } from "@/contexts/local-context";
import { useTranslation } from "react-i18next";

// upload files using uploadcare storage
("---------------------------------------------------");

interface Props {
  ref: React.MutableRefObject<HTMLInputElement | null>;
  max_size: number;
}

const useUpload = ({ ref, max_size }: Props) => {
  const [files, setFiles] = useState<File[] | []>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { t } = useTranslation();
  const { uploadcare_key } = useContext(Context);

  useEffect(() => {
    function handleGetFiles(e: any) {
      if (e.target.files?.length) {
        const filesArr = e.target.files;
        setFiles(filesArr);
      }
    }

    if (ref.current) {
      ref.current.addEventListener("change", handleGetFiles);
    }
    return () => {
      ref.current?.removeEventListener("change", handleGetFiles);
    };
  }, [ref.current]);

  const validateFile = (file: File) => {
    if (file.size > 1000000 * max_size)
      return {
        error: {
          message: t("dashboard:file-too-large", { num: max_size }),
        },
      };
    if (!file.type.startsWith("image/"))
      return {
        error: {
          message: t("dasboard:file-type-incorrect"),
        },
      };
  };

  const startUpload = async () => {
    try {
      if (!files) return;

      setIsUploading(true);

      const v = validateFile(files[0]);
      if (v?.error) {
        toast.error("Validation Error", {
          description: v.error.message,
        });
        return;
      }

      const res = await uploadFile(files[0], {
        publicKey: uploadcare_key,
        onProgress: (e) => {
          if (e.isComputable) {
            const p = Math.floor(e.value * 100);
            setProgress(p);
          }
        },
      });
      if (res.cdnUrl) {
        setFiles([]);
        if (ref.current) {
          ref.current.value = "";
        }
        return res;
      } else throw new Error();
    } catch (err: any) {
      toast.error(t("dashboard:error-message"));
    } finally {
      setIsUploading(false);
    }
  };

  return {
    files,
    startUpload,
    isUploading,
    progress,
  };
};

export default useUpload;

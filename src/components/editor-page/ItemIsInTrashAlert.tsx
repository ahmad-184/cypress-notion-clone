import useTrash from "@/hooks/useTrash";
import { useAppSelector } from "@/store";
import { FolderType } from "@/types";
import { File } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Button } from "../ui/Button";
import { useParams, useRouter } from "next/navigation";

type ItemIsInTrashAlertProps =
  | {
      type: "folder";
      data: FolderType | null;
    }
  | {
      type: "file";
      data: File | null;
    };

const ItemIsInTrashAlert: React.FC<ItemIsInTrashAlertProps> = ({
  type,
  data,
}) => {
  const { current_workspace } = useAppSelector((store) => store.workspace);
  const router = useRouter();
  const { restoreDeletedItem, deleteItemPermanently } = useTrash();
  const { data: session } = useSession();

  if (!data || data === undefined) return null;

  return (
    <div className="w-full p-4 bg-rose-200 dark:bg-rose-800/50">
      <div className="flex flex-col justify-center gap-2">
        <div className="flex w-full items-center justify-center gap-3">
          <p className="dark:text-gray-200 text-sm">
            This {type} is in trash{" "}
            {current_workspace?.type === "shared" ? (
              <>
                by "
                {session?.user.email === data.inTrashBy
                  ? "You"
                  : data.inTrashBy}
                "
              </>
            ) : null}
          </p>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                restoreDeletedItem({
                  id: data.id,
                  type,
                  ...(type === "file" && {
                    folderId: data.folderId,
                  }),
                });
              }}
              size={"sm"}
              variant={"secondary"}
            >
              Restore
            </Button>
            <Button
              onClick={() => {
                deleteItemPermanently({
                  id: data.id,
                  type,
                  ...(type === "file" && {
                    folderId: data.folderId,
                  }),
                });
                if (type === "folder") {
                  router.push(`/dashboard/${data.workspaceId}`);
                }
                if (type === "file") {
                  router.push(
                    `/dashboard/${data.workspaceId}/${data.folderId}`
                  );
                }
              }}
              size={"sm"}
              variant={"destructive"}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemIsInTrashAlert;

import { useEffect, useState } from "react";

import { allImages } from "../../services/admin/allImages";
import { Pin, PinOff } from "lucide-react";
import type { Records } from "../../services/admin/pages";
import CardImage from "./CardImage";

function Gallery() {
    const [records, setRecords] = useState<Records[]>();

    const update = () => {
        allImages()
            .then(async res => {
                const { data } = await res.json();
                setRecords(data);
                return data;
            })
            .then(console.log)
    }

    useEffect(() => {
        update();
    }, [])
    
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {records && records.map((record, index) => (
                <CardImage.WithActions
                    key={index}
                    src={record.path}
                >
                    <CardImage.Button
                        className="rotate-45"
                    >
                        {record.avatar.active ? (
                            <Pin className="size-full text-yellow-600 dark:text-yellow-400"/>
                        ) : (
                            <PinOff className="size-full"/>
                        )}
                    </CardImage.Button>
                </CardImage.WithActions>
            ))}
        </div>
    )
}

export default Gallery;
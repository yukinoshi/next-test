'use client'
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { SortTitle, SortList } from "@/lib/constant";
import {useSortStore} from "@/store/";
import { SortValue } from "@/type/global";

function Sort() {
    const { setValue } = useSortStore();
    const handleValueChange = (groupValue: string[]) => {
        const value = groupValue[0] as SortValue;
        setValue(value);
    };
    return (<div className="w-64 py-4">
        <p className="m-5 text-xl">{SortTitle}</p>
        <ToggleGroup onValueChange={handleValueChange} className="flex-col gap-3" defaultValue={[SortList[0].value]}>
            {SortList.map((item) => (
                <ToggleGroupItem key={item.value} value={item.value}>
                    {item.text}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    </div>);
}

export default Sort;
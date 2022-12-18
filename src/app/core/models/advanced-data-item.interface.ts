import { DataItem } from '@swimlane/ngx-charts';


export interface CountryDataItem extends DataItem {
    extra: {
        id: number
    }
}
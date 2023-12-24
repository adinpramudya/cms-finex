// Define the interface
export interface IFutureContract {
  id?: number | null;
  code?: string | null;
  codeUnix?: string | null;
  contractUnit?: string | null;
  marginPerLotSpot?: string | null;
  marginPerLotRemote?: string | null;
  marginPerLotNone?: string | null;
  commissionPerSideLot?: string | null;
  tradingDaysAndHours?: string | null;
  minimumPriceChange?: string | null;
  price?: string | null;
  contractMonth?: string | null;
}

// Implement the interface in the class
export class FutureContract implements IFutureContract {
  constructor(
    id?: number | null,
    code?: string | null,
    codeUnix?: string | null,
    contractUnit?: string | null,
    marginPerLotSpot?: string | null,
    marginPerLotRemote?: string | null,
    marginPerLotNone?: string | null,
    commissionPerSideLot?: string | null,
    tradingDaysAndHours?: string | null,
    minimumPriceChange?: string | null,
    price?: string | null,
    contractMonth?: string | null
  ) {}
}

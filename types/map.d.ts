export type TKindLocation =
    | "country"
    | "province"
    | "area"
    | "locality"
    | "street"
    | "house"
    | "route"
    | "metro"
    | "district"

export interface IFeatureMember {
    GeoObject: {
        metaDataProperty: {
            GeocoderMetaData: {
                precision: string
                text: string
                kind: string
                Address: {
                    country_code: string
                    formatted: string
                    Components: {
                        kind: TKindLocation
                        name: string
                    }[]
                }
                AddressDetails: {
                    Country: {
                        AddressLine: string
                        CountryNameCode: string
                        CountryName: string
                        AdministrativeArea: {
                            AdministrativeAreaName: string
                            SubAdministrativeArea: {
                                SubAdministrativeAreaName: string
                                Locality: {
                                    LocalityName: string
                                    Thoroughfare: {
                                        ThoroughfareName: string
                                        Premise: {
                                            PremiseNumber: string
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        name: string
        description: string
        boundedBy: {
            Envelope: {
                lowerCorner: string
                upperCorner: string
            }
        }
        uri: string
        Point: {
            pos: string
        }
    }
}

export interface IResponseGeocode {
    response: {
        GeoObjectCollection: {
            metaDataProperty: {
                GeocoderResponseMetaData: {
                    request: string
                    results: string
                    found: string
                }
            }
            featureMember: IFeatureMember[]
        }
    }
}

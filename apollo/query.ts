import { gql } from "@apollo/client"
import { PRODUCT } from "./fragment"

export const me = gql`
    query {
        me {
            id
            email
            fullName
            photo
            phone
            address
            isStaff
            isAdmin
            isSeller
            isSuperuser
        }
    }
`

export const categories = gql`
    query {
        categoryList {
            id
            name
            iconName
        }
    }
`

export const regions = gql`
    query {
        regionList {
            id
            name
        }
    }
`

export const areas = gql`
    query {
        areaList {
            id
            name
        }
    }
`
export const city = gql`
    query {
        cityList {
            id
            name
        }
    }
`

export const productList = gql`
    ${PRODUCT}
    query ($offset: Int) {
        productRequestList(limit: 10, offset: $offset) {
            totalCount
            results {
                ...product
            }
        }
    }
`

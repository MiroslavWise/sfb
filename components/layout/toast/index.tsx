"use client"

import { CToast, CToastBody, CToastHeader, CToaster } from "@coreui/react"
import { useRef, useState } from "react"

export const Toast = () => {
    const [toast, addToast] = useState(undefined)
    const toaster = useRef(null)
    const exampleToast = (
        <CToast>
            <CToastHeader closeButton>
                <svg
                    className="rounded me-2"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                    role="img"
                >
                    <rect width="100%" height="100%" fill="#007aff"></rect>
                </svg>
                <div className="fw-bold me-auto">CoreUI for React.js</div>
                <small>7 min ago</small>
            </CToastHeader>
            <CToastBody>Hello, world! This is a toast message.</CToastBody>
        </CToast>
    )

    return <CToaster push={toast} ref={toaster} placement="top-end" />
}

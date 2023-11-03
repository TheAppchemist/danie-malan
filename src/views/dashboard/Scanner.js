/* eslint-disable react/prop-types */

import {Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { useEffect, useState } from "react";
import ParticipantsService from "src/services/participants";
import React from 'react'

const Scanner = ({
    onCancelScanning
}) => {
    const [uid, setUid] = useState()
    const [scanner, setScanner] = useState()
    const [user, setUser] = useState()

    const handleScan = (decodedText, decodedResult) => {
        if (decodedText) {
            console.log(decodedText);
            
            setUid(decodedText)
        }
    }

    const handleError = (err) => {
        console.log(err);
    }

    useEffect(() => {
        if (uid) {
            scanner.clear()
            ParticipantsService.participant(uid).then(participant => {
                

                return ParticipantsService.checkin(uid).then(() => {
                    setUser(participant)
                })
            })
        }
    }, [uid])

    useEffect(() => {

        if (!scanner) {
            setScanner(new Html5QrcodeScanner('reader', {
                fps: 10,
                formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE]
            }, false))
        } else {
            scanner.render(handleScan, handleError)
        }
    }, [scanner])

    const onClose = () => {
        scanner.clear()
        setUid(undefined)
        setUser(undefined)
        setScanner(undefined)

        onCancelScanning()
    }

    return (
        <div style={{
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            background: 'white',
            zIndex: 10000
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            {!uid && <button onClick={onClose}>Cancel Scanning</button>}
            </div>
            {!uid && <div id="reader" style={{
                width: '100%',
                height: '100%'
            }}></div>}

            {uid && (
                <div style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {user && (
                        <div style={{
                            textAlign: 'center'
                        }}>
                            <h3 style={{
                                fontWeight: 'bold'
                            }}>{user.name}</h3>
                            <h5>{user.email}</h5>
                            <h5 style={{
                                textTransform: 'capitalize'
                            }}>{user.location}</h5>

                            <div style={{
                                color: 'green',
                                marginTop: 40,
                                fontWeight: 'bold',
                                fontSize: 30,
                                marginBottom: 20
                            }}>Participant has been checked in</div>
                            <button onClick={onClose}>Close</button>
                        </div>
                    )}
                </div>
            )}

            
        </div>
    )
}

export default Scanner
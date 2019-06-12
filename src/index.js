import React, { useState } from "react";
import PopoutWrapper from "@vkontakte/vkui/dist/components/PopoutWrapper/PopoutWrapper";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";
import Spinner from "@vkontakte/vkui/dist/components/Spinner/Spinner";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import "./index.css";

// Global hooks
let setVisible = null;
let setLog = null;

// Settings
let product_id = "";
let catcherEnabled = false;
let platform = "web";
const tryout_backend = "https://tryout-vkapps.web.app/api";

const reportWrapper = ({ popout }) => {
    const [ isReportWrapperShow, setIsReportWrapperShow ] =  useState(false);
    const [ error, setError ] = useState(null);
    const [ message, setMessage ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);

    setVisible = setIsReportWrapperShow.bind(isReportWrapperShow);
    setLog = setError.bind(error);

    const closeReportPopout = () => {
        setIsReportWrapperShow(false);
        setError("");
        setMessage("");
        setIsLoading(false);
    };

    if(!!popout) return popout;
    if(!isReportWrapperShow) return null;
    return (
        <PopoutWrapper v="bottom" h="center">
            <div className="modal">
                <div className="modal__header">
                    <span className="modal__title">TryOut отчёт</span>
                    <div className="modal__close" onClick={() => closeReportPopout()}/>
                </div>
                <div>
                    <div style={{ textAlign: "center" }}>
                        <img className="modal__image" src={error ? require("./assets/bug.svg") : require("./assets/inform.svg")} alt="" width="12%" height="12%"/>
                        <h3 style={{ marginBottom: 0, color: "var(--text_primary)" }}>{error ? "Мы поймали ошибку!" : "Сообщить о баге"}</h3>
                        <p style={{ marginTop: 0, marginBottom: 10, color: "var(--text_secondary)" }}>
                            {
                                error
                                    ? "Помогите разработчикам её исправить"
                                    : ""
                            }
                        </p>
                    </div>
                    <FormLayout>
                        <Textarea
                            top="Ваше сообщение"
                            value={message}
                            placeholder={
                                error
                                    ? "Пожалуйста опишите то, что вы делали перед тем, как появилось это окно"
                                    : "Что подозрительного вы заметили в приложении?"
                            }
                            onChange={(e) => setMessage(e.currentTarget.value)}
                        />
                        {!isLoading ?
                            <Button size="xl" onClick={() => {
                                setIsLoading(true);
                                return __sendReport({ product_id, error, message, platform }, closeReportPopout);
                            }}>
                                Отправить
                            </Button>
                            : <div style={{ paddingTop: 10, paddingBottom: 10, display: "flex", justifyContent: "center" }}><Spinner/></div>}
                    </FormLayout>
                </div>
            </div>
        </PopoutWrapper>
    );
};

// LiveCatcher
window.console = (function(oldConsole){
    return {
        log: (obj) => oldConsole.log(obj),
        info: (obj) => oldConsole.info(obj),
        warn: (obj) => oldConsole.warn(obj),
        error: (obj) => {
            if(catcherEnabled) {
                setVisible(true);
                setLog(JSON.stringify(obj) || obj.toString());
            }
            oldConsole.error(obj);
        }
    };
}(window.console));

// Helpers
const __sendReport = ({ product_id, error, message, platform }, callback) => {
    const payload = {
        product_id,
        error,
        message,
        platform
    };

    return fetch(tryout_backend + "/sendReport", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then(() => callback())
        .catch(() => callback())
};

export default {
    init: (params) => {
        product_id = params.product_id || "";
        catcherEnabled = params.catcherEnabled || false;

        const query_params = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&").reduce((a, x) => {
            const data = x.split("=");
            a[decodeURIComponent(data[0])] = decodeURIComponent(data[1]);
            return a;
        }, {});

        switch (query_params) {
            case "mobile_android": return platform = "android";
            case "mobile_iphone": return platform = "ios";
            case "mobile_web": return platform = "web";
            case "desktop_web": return platform = "web";
            default: return platform = "web";
        }
    },
    renderReportForm: (popout) => reportWrapper({ popout }),
    showReportForm: () => setVisible(true)
};
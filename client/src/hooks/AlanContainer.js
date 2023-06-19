import React, {useEffect, useRef} from "react";
import alanBtn from '@alan-ai/alan-sdk-web';
import {withRouter} from "react-router-dom";
import { useFormContext } from "react-hook-form";


const AlanContainer = (props) => {
    const rootElRef=useRef(null);
    const methods = useFormContext();

    useEffect(() => {
        alanBtn({
            key: 'f36629299a753370872ccff96f1442ee2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: (commandData) => {
              if (commandData.command === 'openForm') {
                props.history.push("step2");
              }
              if (commandData.command === 'getUsername') {
                methods.setValue('username', commandData.value);
              }
              if (commandData.command === 'getPassword') {
                methods.setValue('password', commandData.value);
              }
            }
        });
      }, []);

    return(
        <div className="alan-btn-container">
            <div ref={rootElRef}></div>
        </div>


    )

}
export default withRouter(AlanContainer);
import { GetSessionGameDto } from "@/interfaces/EscapeGameInterface/Session/getSessionGameDto";
import { FC } from "react";

interface SessionDetailsProps {
    data : GetSessionGameDto ;
    OnDetails:(org: GetSessionGameDto) => void
    OnUpdate: (org: GetSessionGameDto) => void

}
const SessionDetails :FC<SessionDetailsProps> = ({data})=> {
    return (
        <div>SessionDetails</div>
    )
}

export default SessionDetails;

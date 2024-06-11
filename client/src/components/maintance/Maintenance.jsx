import {FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faHammer} from "@fortawesome/free-solid-svg-icons"
import style from "./Maintenance.module.css"

export default function Maintenance() {
  return (
    <div className={style.page}>
        <h1>Site Under Maintenance</h1>
        <p className={style.p}>We are working to improve our site. Please check back later.</p>
        <FontAwesomeIcon  icon={faHammer} beat />
    </div>
  )
}

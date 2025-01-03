import { Link } from "@inertiajs/react";

const PindahHalaman =({meta}) => {
    const first =meta.links [1].url;
    const last =meta.links[meta.links.length -2].url;
    const current =meta.current_page;
    const prev =meta.links [0].url;
    const next =meta.links [meta.links.length -1].url;

    return (
        <div className="join">
            {prev && <Link href= {first}className="join-item btn btn-outline">««</Link>}
            {prev && <Link href= {prev} className="join-item btn btn-outline">«</Link>}
            <Link className="join-item btn btn-outline">{current}</Link>
            {next && <Link href= {next} className="join-item btn btn-outline"> » </Link>}
            {next && <Link href= {last} className="join-item btn btn-outline">»»</Link>}
        </div>
    )
}

export default PindahHalaman
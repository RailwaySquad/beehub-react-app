import ContentHeader from "../components/ContentHeader";
import FullWidthTable from "../components/FullWidthTable";
import { useAdminGroupsQuery } from "../adminApiSlice";
import { Badge } from "react-bootstrap";
import dateFormat from "dateformat";
import { useState } from "react";
import GroupModal from "../components/modals/GroupModal";
import { MdPublic } from "react-icons/md";
import { CgLock } from "react-icons/cg";
import DeleteButton from "../components/actions/DeleteButton";
import GetMultipleReportType from "../../utils/GetMultipleReportType";
import GetStatus from "../../utils/GetStatus";

const groupHeaders = [
    { style: { width: 10 }, content: 'Id' },
    { content: 'Group Name' },
    { content: 'Visibility' },
    { content: 'Members' },
    { content: 'Create Date' },
    { content: 'Reports'},
    { content: 'Status' },
    { content: 'Action' },
]

function Groups() {
    const { data: groups, isLoading } = useAdminGroupsQuery()

    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(10)

    const [openGroupModal, setOpenGroupModal] = useState(false)
    const [chosenGroup, setChosenGroup] = useState('')

    const handleOpenModal = (e, reportedCase, caseType) => {
        e.preventDefault()
        setChosenGroup(reportedCase)
        setOpenGroupModal(true)
    }

    const lastIndex = currentPage * perPage
    const firstIndex = lastIndex - perPage
    const currentData = groups ? groups.slice(firstIndex, lastIndex) : []

    if (!groups) return
    return (<>
        <ContentHeader pageName={'Groups'} />

        <div className="admin-content">
            <div className="container-fluid">
                <FullWidthTable
                    title={"Groups"}
                    header={groupHeaders}
                    total={groups.length}
                    perPage={perPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                >
                    {currentData.map(g =>
                        <tr key={g.id}>
                            <td>{g.id}.</td>
                            <td>
                                <a href={`group/${g.id}`} onClick={(e) => handleOpenModal(e, g.id, 'group')}>{g.name}</a>
                            </td>
                            <td>
                                {g.public ? <MdPublic /> : <CgLock />} {g.public ? 'public' : 'private'}
                            </td>
                            <td>{g.noOfMembers}</td>
                            <td>{dateFormat(g.createdAt, "dddd, mmmm dS, yyyy")}</td>
                            <td><GetMultipleReportType reports={g.reportTitleList}/></td>
                            <td><GetStatus status={g.active ? 'active' : 'inactive'}/></td>
                            <td>
                                <DeleteButton
                                    caseId={g.id}
                                    caseType={'group'}
                                    confirmContent={'Are you sure you want to delete this group?'}
                                    size={'sm'}
                                />
                            </td>
                        </tr>
                    )}
                </FullWidthTable>
            </div>
        </div>
        <GroupModal open={openGroupModal} onClose={() => setOpenGroupModal(false)} groupId={chosenGroup} />
    </>);
}

export default Groups;
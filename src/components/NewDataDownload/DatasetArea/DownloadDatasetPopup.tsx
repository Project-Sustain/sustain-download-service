/*
Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/


Software in the Sustain Ecosystem are Released Under Terms of Apache Software License

This research has been supported by funding from the US National Science Foundation's CSSI program through awards 1931363, 1931324, 1931335, and 1931283. The project is a joint effort involving Colorado State University, Arizona State University, the University of California-Irvine, and the University of Maryland - Baltimore County. All redistributions of the software must also include this information.

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION


1. Definitions.

"License" shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.

"Licensor" shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.

"Legal Entity" shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity. For the purposes of this definition, "control" means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity.

"You" (or "Your") shall mean an individual or Legal Entity exercising permissions granted by this License.

"Source" form shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, and configuration files.

"Object" form shall mean any form resulting from mechanical transformation or translation of a Source form, including but not limited to compiled object code, generated documentation, and conversions to other media types.

"Work" shall mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a copyright notice that is included in or attached to the work (an example is provided in the Appendix below).

"Derivative Works" shall mean any work, whether in Source or Object form, that is based on (or derived from) the Work and for which the editorial revisions, annotations, elaborations, or other modifications represent, as a whole, an original work of authorship. For the purposes of this License, Derivative Works shall not include works that remain separable from, or merely link (or bind by name) to the interfaces of, the Work and Derivative Works thereof.

"Contribution" shall mean any work of authorship, including the original version of the Work and any modifications or additions to that Work or Derivative Works thereof, that is intentionally submitted to Licensor for inclusion in the Work by the copyright owner or by an individual or Legal Entity authorized to submit on behalf of the copyright owner. For the purposes of this definition, "submitted" means any form of electronic, verbal, or written communication sent to the Licensor or its representatives, including but not limited to communication on electronic mailing lists, source code control systems, and issue tracking systems that are managed by, or on behalf of, the Licensor for the purpose of discussing and improving the Work, but excluding communication that is conspicuously marked or otherwise designated in writing by the copyright owner as "Not a Contribution."

"Contributor" shall mean Licensor and any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor and subsequently incorporated within the Work.

2. Grant of Copyright License. Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, and distribute the Work and such Derivative Works in Source or Object form.

3. Grant of Patent License. Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as stated in this section) patent license to make, have made, use, offer to sell, sell, import, and otherwise transfer the Work, where such license applies only to those patent claims licensable by such Contributor that are necessarily infringed by their Contribution(s) alone or by combination of their Contribution(s) with the Work to which such Contribution(s) was submitted. If You institute patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Work or a Contribution incorporated within the Work constitutes direct or contributory patent infringement, then any patent licenses granted to You under this License for that Work shall terminate as of the date such litigation is filed.

4. Redistribution. You may reproduce and distribute copies of the Work or Derivative Works thereof in any medium, with or without modifications, and in Source or Object form, provided that You meet the following conditions:

You must give any other recipients of the Work or Derivative Works a copy of this License; and
You must cause any modified files to carry prominent notices stating that You changed the files; and
You must retain, in the Source form of any Derivative Works that You distribute, all copyright, patent, trademark, and attribution notices from the Source form of the Work, excluding those notices that do not pertain to any part of the Derivative Works; and
If the Work includes a "NOTICE" text file as part of its distribution, then any Derivative Works that You distribute must include a readable copy of the attribution notices contained within such NOTICE file, excluding those notices that do not pertain to any part of the Derivative Works, in at least one of the following places: within a NOTICE text file distributed as part of the Derivative Works; within the Source form or documentation, if provided along with the Derivative Works; or, within a display generated by the Derivative Works, if and wherever such third-party notices normally appear. The contents of the NOTICE file are for informational purposes only and do not modify the License. You may add Your own attribution notices within Derivative Works that You distribute, alongside or as an addendum to the NOTICE text from the Work, provided that such additional attribution notices cannot be construed as modifying the License.

You may add Your own copyright statement to Your modifications and may provide additional or different license terms and conditions for use, reproduction, or distribution of Your modifications, or for any such Derivative Works as a whole, provided Your use, reproduction, and distribution of the Work otherwise complies with the conditions stated in this License.
5. Submission of Contributions. Unless You explicitly state otherwise, any Contribution intentionally submitted for inclusion in the Work by You to the Licensor shall be under the terms and conditions of this License, without any additional terms or conditions. Notwithstanding the above, nothing herein shall supersede or modify the terms of any separate license agreement you may have executed with Licensor regarding such Contributions.

6. Trademarks. This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor, except as required for reasonable and customary use in describing the origin of the Work and reproducing the content of the NOTICE file.

7. Disclaimer of Warranty. Unless required by applicable law or agreed to in writing, Licensor provides the Work (and each Contributor provides its Contributions) on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied, including, without limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely responsible for determining the appropriateness of using or redistributing the Work and assume any risks associated with Your exercise of permissions under this License.

8. Limitation of Liability. In no event and under no legal theory, whether in tort (including negligence), contract, or otherwise, unless required by applicable law (such as deliberate and grossly negligent acts) or agreed to in writing, shall any Contributor be liable to You for damages, including any direct, indirect, special, incidental, or consequential damages of any character arising as a result of this License or out of the use or inability to use the Work (including but not limited to damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses), even if such Contributor has been advised of the possibility of such damages.

9. Accepting Warranty or Additional Liability. While redistributing the Work or Derivative Works thereof, You may choose to offer, and charge a fee for, acceptance of support, warranty, indemnity, or other liability obligations and/or rights consistent with this License. However, in accepting such obligations, You may act only on Your own behalf and on Your sole responsibility, not on behalf of any other Contributor, and only if You agree to indemnify, defend, and hold each Contributor harmless for any liability incurred by, or claims asserted against, such Contributor by reason of your accepting any such warranty or additional liability.

END OF TERMS AND CONDITIONS
*/
import React, {useState} from "react";
import {
    Button,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Checkbox,
    FormGroup,
    Tooltip, Typography
} from "@material-ui/core";
import FormControlLabel from '@mui/material/FormControlLabel';
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../../global/GlobalTheme";
import {alertTimeout} from "../Utils/utils";
import ListItemButton from '@mui/material/ListItemButton';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import {isLinked} from "../../../library/DatasetUtil";
import ExploreOffIcon from "@material-ui/icons/ExploreOff";
import ExploreIcon from "@material-ui/icons/Explore";
import LinkIcon from "@material-ui/icons/Link";
import Download from "../../../library/Download";

const useStyles = makeStyles({
    modal: {
        padding: theme.spacing(1),
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    modalSection: {
        margin: theme.spacing(1),
    },
    tagsContainer: {
        margin: "10px"
    },
    iconSpacing: {
        margin: "0px 5px"
    },
    headerText: {
        fontSize: "1em"
    },
});

export default function DownloadDatasetPopup(props: any) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [geospatialData, setGeospatialData] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const readableDatasetName = props.currentState.datasets[props.index];

    function getGISJOIN() {
        return props.granularity === "county" ? props.data.currentCounty.GISJOIN : props.data.currentState.GISJOIN;
    }

    function formatRegionForDownload() {
        return {
            GISJOIN: getGISJOIN(),
            name: getName(),
        }
    }

    function getName() {
        return props.granularity === "county" ? `${props.data.currentCounty.name}, ${props.data.currentState.name}` : `${props.data.currentState.name}`;
    }

    function getTags() {
        let tags = []
        //FIXME Needs server support for a .temporal, .level, .linked field
        if (props.dataset.temporal) {
            tags.push(makeTag("This dataset is temporal, and will have multiple records per entry.", <HourglassEmptyIcon />))
        }
        if (isLinked(props.dataset)) {
            tags.push(makeTag("This dataset does not come with geospatial data by default, this can be changed under the 'include geospatial data' option.", <ExploreOffIcon />))
        }
        else {
            tags.push(makeTag("This dataset will come with geospatial data, and will be packaged as a GeoJSON Feature array.", <ExploreIcon />))
        }
        if (isLinked(props.dataset) && geospatialData) {
            tags.push(makeTag("A separate file containing geospatial information as a GeoJSON Feature array will be included.", <LinkIcon />))
        }
        return tags;
    }

    function makeTag(tooltipContent: string, icon: JSX.Element) {
        return <Tooltip className={classes.iconSpacing} title={<Typography>{tooltipContent}</Typography>} key={tooltipContent}>
            {icon}
        </Tooltip>
    }

    function getLocation() {
        return props.granularity === "county" ? `${props.data.currentCounty.name}, ${props.data.currentState.name}` : props.data.currentState.name;
    }

    function addGeospatialText() {
        return geospatialData ? "with" : "without";
    }

    async function handleDownload() {
        props.data.setAlertState({
            open: true,
            text: `Downloading '${readableDatasetName}' in ${getLocation()} ${addGeospatialText()} Geospatial Data`,
            severity: "success"
        });
        alertTimeout(props.data.setAlertState);
        const downloadResult = await Download(props.dataset, formatRegionForDownload(), geospatialData);
        console.log({downloadResult})
        handleClose();
    }

    function handleCheck() {
        setGeospatialData(!geospatialData);
    }

    return (
        <div>
            <ListItemButton onClick={handleOpen}>
                {props.currentState.datasets[props.index]}
            </ListItemButton>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Paper elevation={3} className={classes.modal}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.headerText}>
                                    {readableDatasetName}
                                </TableCell>
                                <TableCell className={classes.headerText} align="right">
                                    {getLocation()}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox color="primary" checked={geospatialData} onChange={handleCheck} />}
                                            label="Include Geospatial Data"
                                        />
                                    </FormGroup>
                                </TableCell>
                                <TableCell align="right">
                                    {getTags()}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Button onClick={handleDownload} startIcon={<DownloadIcon/>}>Download</Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button onClick={handleClose} startIcon={<CloseIcon/>}>Close</Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </Modal>
        </div>
    );
}
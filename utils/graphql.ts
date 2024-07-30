export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    siteAdmin: boolean;
    active: boolean;
}

export type Contributor = {
    id: string;
    userId: string;

    partnerOrgId: string;
    researchProjectId: string;

    hourlyRate: number;
    benRatePer: number;
}

export type PartnerOrg = {
    id: string;
    name: string;
    admins: string[];
    contributors: Contributor[];
}

export type HourContribution = {
    hours: number;
    hourlyRate: number;
    benRatePer: number;
};

export type OtherContribution = {
    itemName: string;
    value: number;
    items: number;
};

export type Contribution = {
    id: string;
    contributorId: string;
    date: string;
    details: string;

    hourContribution: HourContribution;
    otherContribution: OtherContribution;
};

export type MonthlyContrib = {
    month: string;
    total: number
}

export type ProjContrib = {
    projectName: string;
    contributions: [MonthlyContrib]
}

export type IKCReport = {
    id: string;
    partnerOrgId: string;
    researchProjectId: string;
    reportStartDate: string;

    contributions: Contribution[];
    submitterId: string;
    submissionDate: string;
    isApproved: boolean;
    approverId: string;
    approvalDate: string;
}

export type PartnerOrgItem = {
    id: string;
    name: string;
    contributors: Contributor[];
}

export type ResearchProject = {
    id: string;
    projectTitle: string;
    startDate: string;
    endDate: string;
    admins: string[];
    projectPartners: PartnerOrgItem[];
    ikcReports: IKCReport[];
}
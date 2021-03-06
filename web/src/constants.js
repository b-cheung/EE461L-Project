export const modelOptions = [
    { title: 'Major Occupations', tablename: 'occupations_major', route: 'occupation' },
    { title: 'Specific Occupations', tablename: 'occupations_detailed', route: 'occupation' },
    { title: 'Major Industries', tablename: 'industries_3d', route: 'industry' },
    { title: 'Specific Industries', tablename: 'industries_4d', route: 'industry' },
    { title: 'States', tablename: 'states', route: 'location' }
    // { title: 'Metropolitan Areas', tablename: 'metro_areas', route: 'location' }
];

export const getModelRoutes = {
    occupations_major: 'occupation',
    occupations_detailed: 'occupation',
    industries_3d: 'industry',
    industries_4d: 'industry',
    states: 'location',
    metro_areas: 'location'
};
const joinedTablenames = {
    occupations_major: '_occ_major',
    occupations_detailed: '_occ_detailed',
    industries_3d: 'ind_3d',
    industries_4d: 'ind_4d',
    states: 'state',
    metro_areas: 'metro_area'
};

export function getJoinedTablename(primaryTable, secondaryTable) {
    const joinedPrimary = joinedTablenames[primaryTable];
    const joinedSecondary = joinedTablenames[secondaryTable];
    if (joinedPrimary.substring(0, 1) === '_') {
        return joinedSecondary + joinedPrimary;
    }
    return joinedPrimary + joinedSecondary;
}

// major and specific models
export const isMajorModel = {
    occupations_major: true,
    occupations_detailed: false,
    industries_3d: true,
    industries_4d: false,
    states: true,
    metro_areas: false
};

export const getMajorModel = {
    occupations_detailed: 'occupations_major',
    industries_4d: 'industries_3d',
    metro_areas: 'states'
};

export const getSpecificModel = {
    occupations_major: 'occupations_detailed',
    industries_3d: 'industries_4d',
    states: 'metro_areas'
};

// label for models
export const getModelLabelPlural = {
    occupations_major: 'Major Occupations',
    occupations_detailed: 'Specific Occupations',
    industries_3d: 'Major Industries',
    industries_4d: 'Specific Industries',
    states: 'States',
    metro_areas: 'Metropolitan Areas'
};

export const getModelLabelSingular = {
    occupations_major: 'Major Occupation',
    occupations_detailed: 'Specific Occupation',
    industries_3d: 'Major Industry',
    industries_4d: 'Specific Industry',
    states: 'State',
    metro_areas: 'Metropolitan Area'
};

// format wage and salary
const wageFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

const salaryFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
});

const numFormatter = new Intl.NumberFormat('en-US');

export function formatWage(wage) {
    const formattedWage = wageFormatter.format(wage);
    if (wage === 100) {
        return `≥ ${formattedWage}`;
    }
    if (wage === -1) {
        return 'Not Available';
    }
    return formattedWage;
}

export function formatSalary(salary) {
    const formattedSalary = salaryFormatter.format(salary);
    if (salary === 208000) {
        return `≥ ${formattedSalary}`;
    }
    if (salary === -1) {
        return 'Not Available';
    }
    return formattedSalary;
}

export function formatNum(num) {
    if (num === -1) {
        return 'Not Available';
    }
    const formattednum = numFormatter.format(num);

    return formattednum;
}

export const formatterType = {
    hourly_10: formatWage,
    hourly_25: formatWage,
    hourly_median: formatWage,
    hourly_75: formatWage,
    hourly_90: formatWage,
    hourly_mean: formatWage,
    annual_10: formatSalary,
    annual_25: formatSalary,
    annual_median: formatSalary,
    annual_75: formatSalary,
    annual_90: formatSalary,
    annual_mean: formatSalary,
    total_employment: formatNum,
    total_population: formatNum
};

export const wageSalaryTableColumns = [
    {
        dataField: 'type',
        text: 'Type'
    },
    {
        dataField: 'mean',
        text: 'Mean'
    },

    {
        dataField: '10',
        text: '10th Percentile'
    },
    {
        dataField: '25',
        text: '25th Percentile'
    },
    {
        dataField: 'median',
        text: 'Median'
    },
    {
        dataField: '75',
        text: '75th Percentile'
    },
    {
        dataField: '90',
        text: '90th Percentile'
    }
];

// graph type and label
export const graphType = {
    hourly_median: { label: 'Hourly Wage Median', graph: 'bar' },
    hourly_mean: { label: 'Hourly Wage Mean', graph: 'bar' },
    annual_median: { label: 'Annual Salary Median', graph: 'bar' },
    annual_mean: { label: 'Annual Salary Mean', graph: 'bar' },
    total_employment: { label: 'Employment', graph: 'pie' },
    total_population: { label: 'Population', graph: 'pie' }
};

// stat labels and keys
export const wageStats = [
    { label: 'Hourly Median', value: 'hourly_median' },
    { label: 'Hourly Mean', value: 'hourly_mean' }
];

export const salaryStats = [
    { label: 'Annual Median', value: 'annual_median' },
    { label: 'Annual Mean', value: 'annual_mean' }
];

export const employmentStats = { label: 'Employment', value: 'total_employment' };

export const popStats = { label: 'Population', value: 'population' };

export const generalStats = [employmentStats, popStats];

export const stats = [...wageStats, ...salaryStats, employmentStats];

export const statsWithPop = [...stats, popStats];

export const groupedStats = [
    employmentStats,
    {
        label: 'Wage',
        options: wageStats
    },
    {
        label: 'Salary',
        options: salaryStats
    }
];

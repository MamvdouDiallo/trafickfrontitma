import { ChartType } from "./profile.model";

const revenueBarChart: ChartType = {
  chart: {
    height: 300,
    type: "bar",
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "14%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  series: [
    {
      name: "Revenue",
      data: [42, 85, 101, 56, 37, 105, 38, 58, 92, 82, 72, 32],
    },
  ],
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  yaxis: {
    title: {
      text: "$ (thousands)",
    },
  },
  fill: {
    opacity: 1,
  },
  colors: ["#556ee6"],
};

const statData = [
  {
    icon: "bx bx-check-circle",
    title: "Projets terminés",
    value: "0",
  },
  {
    icon: "bx bx-hourglass",
    title: "Projets en cours",
    value: "1",
  },
  {
    icon: "bx bx-package",
    title: "Total des projets",
    value: "1",
  },
];

export { revenueBarChart, statData };

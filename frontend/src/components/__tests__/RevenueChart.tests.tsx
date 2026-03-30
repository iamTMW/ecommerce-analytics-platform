import { render } from '@testing-library/react';
import RevenueChart from '../RevenueChart';

jest.mock('react-chartjs-2', () => ({
  Line: (props: any) => {
    (global as any).chartProps = props;
    return <div />;
  },
}));

it('passes rows into the chart correctly', () => {
  render(
    <RevenueChart
      datasetLabel="Monthly revenue"
      rows={[
        { period: 'Jan', revenue: 1000 },
        { period: 'Feb', revenue: 2000 },
      ]}
    />,
  );

  expect((global as any).chartProps.data.labels).toEqual(['Jan', 'Feb']);
  expect((global as any).chartProps.data.datasets[0].data).toEqual([1000, 2000]);
  expect((global as any).chartProps.data.datasets[0].label).toBe('Monthly revenue');
});
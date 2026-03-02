import CustomerDetailPageCom from "@/module/customer/components/customer-detail-page-com";

interface PageProps {
    params: Promise<{
        customeId: string
    }>
}

const CustomerDetailPage = async ({ params }: PageProps) => {
    const { customeId } = await params;
    return (
        <CustomerDetailPageCom customerId={customeId} />
    )
}

export default CustomerDetailPage
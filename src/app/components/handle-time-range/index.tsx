import {TimeRange, timeRanges} from "@/app/constants/timeRanges";
import {useCallback} from "react";
import {Row, Button, Card} from "@nextui-org/react";
import {useTranslations} from "use-intl";

export function HandleTimeRange({usedTimeRange, handleCta}: {
    usedTimeRange: TimeRange,
    handleCta: (v: TimeRange) => void
}) {
    const t = useTranslations('HandleTimeRange');
    const renderTimeRanges = useCallback(() => {
        return timeRanges.map((timeRange, index) => {
            return <Button
                    key={`button-time-range-${index}`}
                    flat={timeRange.value !== usedTimeRange.value}
                    color="primary"
                    onPress={() => handleCta(timeRange)}
                    auto
                >
                    {t(timeRange.labelShortKey)}
                </Button>
        });
    }, [usedTimeRange, t, handleCta]);

    return (
        <section>
            <Card css={{maxWidth: "380px", m: "0 auto"}}>
                <Card.Body>
                    <Row justify={"space-between"}>
                        {renderTimeRanges()}
                    </Row>
                </Card.Body>
            </Card>
        </section>
    );
}

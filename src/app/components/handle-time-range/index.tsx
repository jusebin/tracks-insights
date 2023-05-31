import {TimeRange, timeRanges} from "@/app/constants/timeRanges";
import React, {useCallback} from "react";
import {Row, Button, Card, Modal, Text, useModal} from "@nextui-org/react";
import {useTranslations} from "use-intl";
import {SvgIcon} from "@/app/components/svgIcon";

export function HandleTimeRange({usedTimeRange, handleCta}: {
    usedTimeRange: TimeRange,
    handleCta: (v: TimeRange) => void
}) {
    const t = useTranslations('HandleTimeRange');
    const { setVisible, bindings } = useModal();

    const renderTimeRanges = useCallback(() => {
        return timeRanges.map((timeRange, index) => {
            return <Button
                key={`button-time-range-${index}`}
                flat={timeRange.value !== usedTimeRange.value}
                color="secondary"
                onPress={() => handleCta(timeRange)}
                auto
            >
                {t(timeRange.labelShortKey)}
            </Button>
        });
    }, [usedTimeRange, t, handleCta]);

    return (
        <>
            <Button
                rounded
                shadow
                color={"secondary"}
                icon={<SvgIcon name={"filter"} width={40} height={40} />}
                size={'xs'}
                css={{
                    height: '80px',
                    p: 0,
                    position: 'fixed',
                    bottom: "12px",
                    right: "12px",
                    transform: "scale(0.85)",
                    "@sm": {
                        d: 'none'
                    }
                }}
                onPress={() => setVisible(true)}
            />
            <Modal
                scroll
                closeButton
                aria-labelledby="modal-title"
                {...bindings}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        {t('modalTitle')}
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    {renderTimeRanges()}
                </Modal.Body>
            </Modal>
            <Card
                variant={"shadow"}
                css={{
                maxWidth: "380px",
                m: "0 auto",
                position: 'fixed',
                bottom: "15px",
                left: "50%",
                transform: "translateX(-50%)",
                "@smMax": {
                    d: 'none'
                }
            }}>
                <Card.Body>
                    <Row justify={"space-between"}>
                        {renderTimeRanges()}
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
}

import React from "react";
import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    it("status from props should be in the state", () => {
        const component = create(<ProfileStatus status={"it-kamasutra.com"} />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("it-kamasutra.com");
    });
    it("after creation <span> with status should be displayed", () => {
        const component = create(<ProfileStatus status={"it-kamasutra.com"} />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });

    it("after creation <span> with status contains correct status", () => {
        const component = create(<ProfileStatus status={"it-kamasutra.com"} />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("it-kamasutra.com");
    });

    it("after creation <input> with status shouldn't be displayed", () => {
        const component = create(<ProfileStatus status={"it-kamasutra.com"} />);
        const root = component.root;

        expect(() => {
            let input = root.findByType("input");
        }).toThrow();
    });

    it("<input> should be displayed in editMode instead of <span>", () => {
        const component = create(<ProfileStatus status={"it-kamasutra.com"} />);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("it-kamasutra.com");
    });

    it("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status={"it-kamasutra.com"} updateStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});
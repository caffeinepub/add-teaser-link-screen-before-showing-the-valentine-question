# Specification

## Summary
**Goal:** Add a teaser link screen that appears first, then reveals the existing Valentine proposal experience on click.

**Planned changes:**
- Update the initial recipient flow to show a single prominent, link-style call-to-action reading exactly “Click here for a surprise”, with the proposal question and Yes/No UI hidden on first load.
- Make the teaser call-to-action fully keyboard accessible (activatable via Enter/Space) and clearly clickable.
- On teaser activation, transition to the existing proposal card (“Will you be my Valentine, Keya?”) with the current Yes/No behaviors, animations, and acceptance state preserved.
- Ensure the Share section appears in the proposal experience after reveal and continues to copy the current URL and the existing English prefilled message.

**User-visible outcome:** Recipients first see “Click here for a surprise”; after clicking/tapping (or pressing Enter/Space), they see the full Valentine question with the same Yes/No interactions, animations, and Share tools as before.

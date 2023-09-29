import { AccordionProvider } from "../../contexts/accordionContext";
import { AccordionHeader, AccordionItem, AccordionPanel } from "../Accordion";

const ProjectAccordion = () => {
  return (
    <div>
      <AccordionProvider>
        <AccordionItem>
          <AccordionHeader>Description</AccordionHeader>
          <AccordionPanel>This is Description</AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader>Location</AccordionHeader>
          <AccordionPanel>This is location</AccordionPanel>
        </AccordionItem>
      </AccordionProvider>
    </div>
  );
};

export default ProjectAccordion;

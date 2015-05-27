'use strict';

import React from 'react';

function getFormData(formComponent) {
  const formNode = React.findDOMNode(formComponent);
  const formData = [].slice.call(formNode.elements, 0)
                     .filter(x => x.name)
                     .reduce((accum, elem) => {
                       if (elem.type === 'radio' ||
                           elem.type === 'checkbox') {
                           if (elem.checked) {
                             accum[elem.name] = elem.value;
                           }
                           return accum;
                       }
                       if (elem.attributes.multiple) {
                         accum[elem.name] =
                         [].slice.call(elem.options, 0)
                           .filter(x => x.selected)
                           .map(x => x.value);
                         return accum;
                       }
                       accum[elem.name] = elem.value;
                       return accum;
                     }, {});
  return formData;
}

export default getFormData;

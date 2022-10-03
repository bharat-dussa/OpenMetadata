/*
 *  Copyright 2022 Collate
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
import { findAllByTestId, findByTestId, render } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { LOGIN_SLIDE } from '../../constants/login.const';
import LoginCarousel from './LoginCarousel';

jest.mock('react-slick', () => {
  return jest
    .fn()
    .mockImplementation(({ children }: { children: ReactNode }) => (
      <div data-testid="react-slick">{children}</div>
    ));
});

describe('Test LoginCarousel component', () => {
  it('LoginCarousel component should render properly', async () => {
    const { container } = render(<LoginCarousel />, {
      wrapper: MemoryRouter,
    });

    const reactSlick = await findByTestId(container, 'react-slick');
    const carouselContainer = await findByTestId(
      container,
      'carousel-container'
    );
    const sliderContainer = await findAllByTestId(
      container,
      'slider-container'
    );
    const descriptions = await findAllByTestId(
      container,
      'carousel-slide-description'
    );

    expect(reactSlick).toBeInTheDocument();
    expect(carouselContainer).toBeInTheDocument();
    expect(sliderContainer.length).toBe(LOGIN_SLIDE.length);
    expect(descriptions.map((d) => d.textContent)).toEqual(
      LOGIN_SLIDE.map((d) => d.description)
    );
  });
});

import React from 'react';
import tw, { styled } from 'twin.macro';

export default function GameSetting() {
  return (
    <SettingContainer>
      <select name="pets" id="pet-select">
        <option value="">--Please choose an option--</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="hamster">Hamster</option>
        <option value="parrot">Parrot</option>
        <option value="spider">Spider</option>
        <option value="goldfish">Goldfish</option>
      </select>
      <form>
        <fieldset>
          <legend>Please select your preferred contact method:</legend>
          <div>
            <input type="radio" id="contactChoice1" name="contact" value="email" />
            <label htmlFor="contactChoice1">Email</label>

            <input type="radio" id="contactChoice2" name="contact" value="phone" />
            <label htmlFor="contactChoice2">Phone</label>

            <input type="radio" id="contactChoice3" name="contact" value="mail" />
            <label htmlFor="contactChoice3">Mail</label>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </fieldset>
      </form>
    </SettingContainer>
  );
}
const SettingContainer = styled.div`
  ${tw`border-2 border-black w-[50%]`}
`;
